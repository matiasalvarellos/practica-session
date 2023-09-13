const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const { body, check} =require('express-validator');

const validation = [
    body('name').notEmpty().withMessage('Campo vacio'),
    body('email')
        .notEmpty()
        .withMessage('Campo vacio')
        .bail()
        .isEmail()
        .withMessage('formato invalido'),
    body('age').notEmpty().withMessage('Campo vacio'),
    body('color').notEmpty().withMessage('Campo vacio')
]


router.get('/', mainController.home);
router.post('/login', validation, mainController.login);
router.get('/test', function(req, res){
    if(req.session.user){

        res.send('El usuario ' + req.session.user.name  + ' con la edad:'+  req.cookies.age + 'esta en sesión!');
    }else{
        res.send('No existe el usuario en sesión!');
    }
})
router.get('/logout', function(req, res){
    req.session.destroy();
    res.clearCookie('age');
    res.send('cerraste sesión!');
})


module.exports = router;