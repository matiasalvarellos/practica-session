const { validationResult } = require('express-validator');

module.exports =  {
    home: (req, res)=> {
        res.render('home');
    },
    login: (req, res)=> {
        const resultError = validationResult(req)
        console.log(resultError);
        if(resultError.isEmpty()){
            const user = {
                color: req.body.color,
                name: req.body.name,
                age:   req.body.age,
                email:  req.body.email,
            }
           //todo salio bien
           res.cookie('age', req.body.age, { maxAge: 60000 * 24 });
           req.session.user = user
           res.render('home', { user: user, color: req.body.color  });

        }else {
            // console.log(resultError.mapped())
            // console.log(resultError.array())
            //tenemos errores
            res.render('home', { errors: resultError.array() })
        }
        
    }
}
