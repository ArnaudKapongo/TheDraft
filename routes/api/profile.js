const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateDetection = require('../../validation/detection');
const validateStaff = require('../../validation/staff');
const validateProfileInput = require('../../validation/profile');

const Profile = require('../../models/Profile');

const User = require('../../models/User');


router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        if(!profile){
            errors.noprofile = 'Aucun profil pour cette Team';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});


router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {

      if(!profiles) {
        errors.noprofile = 'Aucun profil pour cette Team';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    }).catch(err => res.status(404).json({ profile: 'Aucun profil pour cet Team'}));
  });



router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar']).then(profile => {
        if(!profile) {
          errors.noprofile = 'Aucun profil pour cette Team';
          res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});


router.get('/user/:user_id', (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile){
        errors.noprofile = 'Aucun profil pour cette Team';
        res.status(404).json(errors);
      }

      res.json(profile);
    }).catch(err => res.status(404).json({ profile: 'Aucun profil pour cette Team'})
  );
});



router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {


    const { errors, isValid } = validateProfileInput(req.body);

    if(!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.sport) profileFields.sport = req.body.sport;
    if (req.body.website) profileFields.website = req.body.website;



    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          // Mise à jour
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {


          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'Le nom de l\'équipe existe déjà';
              res.status(400).json(errors);
            }

            // Sauvegarder profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
        }
      });
});

router.post('/detection',
passport.authenticate('jwt', {session: false}),
(req, res) => {
  const { errors, isValid } = validateDetection(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {

    const newDet = {
        name: req.body.name,
        surname: req.body.surname,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description,
        school: req.body.school
    };

    profile.detection.unshift(newDet);

    profile.save().then(profile => res.json(profile));
  });
  }
);

router.post('/staff', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateStaff(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {

    const newSta = {
        name: req.body.name,
        surname: req.body.surname,
        location: req.body.location,
        description: req.body.description,
        nationality: req.body.nationality
    };
    profile.staff.unshift(newSta);

    profile.save().then(profile => res.json(profile));
  });
  }
);


router.delete('/detection/:det_id',
  passport.authenticate('jwt', {session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {

      const removeIndex = profile.detection.map(item => item.id).indexOf(req.params.det_id);

      profile.detection.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));

    }).catch(err => res.status(404).json(err));
  }
);

router.delete('/staff/:sta_id',
  passport.authenticate('jwt', {session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {

      const removeIndex = profile.staff.map(item => item.id).indexOf(req.params.sta_id);

      profile.staff.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));

    }).catch(err => res.status(404).json(err));
  }
);


router.delete('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
    });
  }
);

module.exports = router;
