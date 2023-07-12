
    import express from 'express';
    import {PoliceStation} from '../Models/policestation.model.js';
    import { PoliceOfficer } from '../Models/policeofficer.model.js';

    const router = express.Router();
    router.route('/').get((req, res) => {
        PoliceStation.find().populate('policeOfficers')
        .then(PoliceStation => res.json(PoliceStation))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    router.route('/add').post((req,res) => {
        const name = req.body.name;
        const phone = req.body.phone;
        const address = req.body.address;
        const password = req.body.password;
        const newStation = new PoliceStation({name,phone,address,password});
        newStation.save()
            .then(()=>res.json("Police Station added!!!"))
            .catch(err=>res.status(400).json('Error: '+err))
    });
    router.route('/:id').delete((req, res) => {
        PoliceStation.findByIdAndDelete(req.params.id)
        .then(() => res.json('Police Station deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    router.route('/update/:id').patch((req, res) => {
        PoliceStation.findById(req.params.id)
        .then(PoliceStation => {
            PoliceStation.name = req.body.name;
            PoliceStation.phone = req.body.phone;
            PoliceStation.address = req.body.address;
            PoliceStation.password = req.body.password;
    

            PoliceStation.save()
            .then(() => res.json('Police Station updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });
    export default router;
