const db = require('./db');
const Student = db.model('student');
const Campus = db.model('campus');
const Bluebird = require('bluebird');

const campuses = [
  {
    name: "Raven's Nest Correctional Center",
    imageUrl: 'http://cdn.missourinet.com/wp-content/uploads/2013/10/A-Hall-low-res.jpg'
  },
  {
    name: 'Golden Cay Penitentiary',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/06/03/14/43/prison-1433543_1280.jpg'
  },
  {
    name: 'Stoneward Institution',
    imageUrl: 'https://www.theclio.com/web/ul/13583.23966.jpg'
  },
  {
    name: 'Frozen Lake Medium Security Prison',
    imageUrl: 'http://www.navtechradar.com/wp-content/uploads/2015/02/dartmoor_prison_465x309.jpg'
  }
];

const students = [
  {
    name: 'Bam Bam',
    email: 'bb3213@aol.com',
    campus: campuses[0]
  },
  {
    name: 'Tonka Joe',
    email: 'tonkjay2@aol.com',
    campus: campuses[1]
  },
  {
    name: 'Bubba Jones',
    email: 'bubbz87@aol.com',
    campus: campuses[2]
  },
  {
    name: 'Slippery Rick',
    email: 'slickrick33@aol.com',
    campus: campuses[3]
  },
  {
    name: 'Danny Pickle',
    email: 'picklemedanny@aol.com',
    campus: campuses[1]
  },
  {
    name: 'Just Juan',
    email: 'justjoking@aol.com',
    campus: campuses[2]
  },
  {
    name: 'Randy Lowes',
    email: 'yorandy@aol.com',
    campus: campuses[3]
  },
  {
    name: 'Briggs Meyer',
    email: 'lemons4life@aol.com',
    campus: campuses[1]
  },
  {
    name: 'Tommy Kitten',
    email: 'doghater73@aol.com',
    campus: campuses[2]
  },
  {
    name: 'Grace Hopping',
    email: 'femalesarecooltoo@aol.com',
    campus: campuses[3]
  }
];

db
  .sync({ force: true })
  .then(() => {
    return Bluebird.map(students, student => {
      return Student.create(student, {
        include: [Campus]
      });
    });
  })
  .then(function() {
    console.log('Finished inserting data');
  })
  .catch(function(err) {
    console.error('There was totally a problem', err, err.stack);
  })
  .finally(function() {
    db.close();
    console.log('connection closed');
    return null;
  });
