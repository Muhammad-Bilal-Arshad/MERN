import express from 'express';
import { PoliceOfficer } from '../Models/policeofficer.model.js';
import { PoliceStation } from '../Models/policestation.model.js';
const router = express.Router();
router.route('/').get((req, res) => {
    PoliceOfficer.find()
      .then(PoliceOfficer => res.json(PoliceOfficer))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/:id').get((req, res) => {
    PoliceOfficer.findById(req.params.id)
      .then(PoliceOfficer => res.json(PoliceOfficer))
      .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req,res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password= req.body.password;
    const policeStationId = req.body.policeStation;

    PoliceStation.findById(policeStationId)
    .then(policeStation => {
        if (!policeStation) {
            return res.status(404).json('Police station not found');
        }

        const newOfficer = new PoliceOfficer({name,phone,email,password,policeStation: policeStation._id});

        policeStation.policeOfficers.push(newOfficer);
        Promise.all([newOfficer.save(), policeStation.save()])
        .then(() => res.json("Police Officer added!!!"))
        .catch(err=>res.status(400).json('Error: '+err))
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    PoliceOfficer.findByIdAndDelete(req.params.id)
    .then(() => res.json('Police Officer deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').put((req, res) => {
    PoliceOfficer.findById(req.params.id)
    .then(PoliceOfficer => {
        PoliceOfficer.name = req.body.name;
        PoliceOfficer.phone = req.body.phone;
        PoliceOfficer.email = req.body.email;
        PoliceOfficer.password = req.body.password;
        PoliceOfficer.policeStationId = req.body.policeStation;
   

        PoliceOfficer.save()
        .then(() => res.json('Police Officer updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
export default router;
