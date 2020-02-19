var express = require('express');
var router = express.Router();
var Settings = require("../models/db").Settings;
var Candidates = require("../models/db").Candidates;
var Students = require("../models/db").Students;
var Admin = require("../models/db").Admin;
var allData = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/setup', function(req, res, next){
  res.render('setup');
});
router.post('/setup', function(req, res, next){
  var setting = new Settings;
  setting.numberOfPresident = req.body.president;
  setting.numberOfVicePresident = req.body.vicePresident;
  setting.numberOfGenSec = req.body.generalSecretary;
  setting.numberOfTreasurer = req.body.treasurer;
  setting.numberOfFinSec = req.body.financialSecretary;
  setting.numberOfAssGenSec = req.body.assGenSec;
  setting.numberOfDoso = req.body.directorOfSocials;
  setting.numberOfDosp = req.body.directorOfSports;
  setting.numberOfLibrarian = req.body.librarian;
  setting.numberOfPro = req.body.profficer;

  setting.save(function(err){
    if(err) return next(err);

    res.redirect('/upload');

  });
});
router.get('/login', function(req, res, next){
  res.render("login")
});
router.post('/login', function(req, res, next){
    Admin.find({}, function(err, admin){
      if(err) return next(err);

      console.log(admin);
      if (admin.length === 0){
  
        var admin = new Admin;

        admin.name = req.body.username;
        admin.password = req.body.password;

        console.log(admin);

        admin.save(function(err){
          if (err) return next(err);

          res.redirect('/setup');
        });
      }else{
        if(admin.password === req.body.password){
          res.redirect('/setup')
        }
        else{
          res.redirect('/login')
        }
      }
    });

});
router.get('/upload', function(req, res, next){
  res.render("upload");
});
router.post('/upload', function(req, res, next){

});
router.get('/details', function(req, res, next){
  res.render("details");
});
router.post('/details', function(req, res, next){
    var order = ["President", "Vice President", "General Secretary", "Assistant General Secretary", "Financial Secretary", "Treasurer", "PRO", "Librarian", "Director of Socials", "Director of Sports"];

    var candidate = new Candidates;

    candidate.name = req.body.nameOfCandidate;
    candidate.position = req.body.positionOfCandidate;
    
    for (var z = 0; z < order.length; z++){
      if(req.body.positionOfCandidate === order[z]){
        candidate.order = z;
      }
    }

    candidate.save(function(err){
      if(err) return next(err);

      res.redirect('/details');
    })
});
router.get('/candidatesAdded', function(req, res, next){
    Candidates.find({}, 'position name votes -_id', {sort:{order: 1}}, function(err, candidates){
      if(err) return next(err);

      res.json(candidates);
    });
})
router.get('/summary', function(req, res, next){
  res.render("summary");
});
router.post('/summary', function(req, res, next){

});

// ajax actions for summary page

router.get('/ps', function(req, res, next){
  Candidates.find({position: 'President'}, 'position name -_id', function(err, presidents){
    if(err) return next(err);

    res.json(presidents);
  });
});
router.get('/vp', function(req, res, next){
  Candidates.find({position: 'Vice President'}, 'position name -_id', function(err, vps){
    if(err) return next(err);

    res.json(vps);
  });
});
router.get('/gs', function(req, res, next){
  Candidates.find({position: 'General Secretary'}, 'position name -_id', function(err, gs){
    if(err) return next(err);

    res.json(gs);
  });
});
router.get('/fs', function(req, res, next){
  Candidates.find({position: 'Financial Secretary'}, 'position name -_id', function(err, finSecs){
    if(err) return next(err);

    res.json(finSecs);
  });
});
router.get('/trea', function(req, res, next){
  Candidates.find({position: 'Treasurer'}, 'position name -_id', function(err, treas){
    if(err) return next(err);

    res.json(treas);
  });
});
router.get('/doso', function(req, res, next){
  Candidates.find({position: 'Director of Socials'}, 'position name -_id', function(err, dosos){
    if(err) return next(err);

    res.json(dosos);
  });
});
router.get('/dosp', function(req, res, next){
  Candidates.find({position: 'Director of Sports'}, 'position name -_id', function(err, dosps){
    if(err) return next(err);

    res.json(dosps);
  });
});
router.get('/ags', function(req, res, next){
  Candidates.find({position: 'Assistant General Secretary'}, 'position name -_id', function(err, ags){
    if(err) return next(err);

    res.json(ags);
  });
});
router.get('/pro', function(req, res, next){
  Candidates.find({position: 'PRO'}, 'position name -_id', function(err, pros){
    if(err) return next(err);

    res.json(pros);
  });
});
router.get('/lib', function(req, res, next){
  Candidates.find({position: 'Librarian'}, 'position name -_id', function(err, librarians){
    if(err) return next(err);

    res.json(librarians);
  });
});
module.exports = router;
