import passport, { use } from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import Patient from './models/patients';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLOUD_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => {
  try {
    let user = await Patient.findOne({ google_id: profile.id });
    if (!user) {
      user = new Patient({
        google_id: profile.id,
        first_name: profile.displayName,
        email: profile.emails![0].value,
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
  try {
    const user = await Patient.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

export default passport;
