const jwt = require('jwt-simple');
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db', { logging: false });

const School = conn.define('school', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://www.fillmurray.com/200/300'
  }
});

const Student = conn.define('student', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING//hash me!
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get: function(){
      return `${this.firstName} ${this.lastName}`;
    }
  },
  GPA: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 2.0,
    validate: {
      notEmpty: true
    }
  }
}, {
  hooks: {
    beforeValidate: function(student){
      if(student.schoolId === ''){
        student.schoolId = null;
      }
    }
  }
});

Student.authenticate = function({ email, password }){
  return this.findOne({ where: { email, password }})
    .then( student => {
      if(!student){
        const err = Error('not authorized');
        err.status = 401;
        throw err;
      }
      return jwt.encode({ id: student.id}, process.env.JWT);
    })
}

Student.findFromToken = function(token){
  const id = jwt.decode(token, process.env.JWT).id;
  return Student.findByPk(id)
    .then( student => {
      if(!student){
        const err = Error('not authorized');
        err.status = 401;
        throw err;
      }
      return student;
    });
}

School.hasMany(Student);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const _schools = [
    {
      name: 'MIT',
      imageURL: 'http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/news_article_image_top_slideshow/public/images/2018/MIT-Computer-Announce-01_0.jpg?itok=nDI5_kh0'

    },
    {
      name: 'Harvard',
      imageURL: 'https://www.bostonglobe.com/resizer/4PIipFYoNizWOUXlUEuEwPxpAbA=/960x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/7CBLSLWJTUI6RHP43HWZT7FW24.jpg'
    },
    {
      name: 'UCLA',
      imageURL: 'https://cdn.vox-cdn.com/thumbor/BItGWT7ZqQNwPCgGbMAvW79X6CM=/0x0:6115x4081/1820x1213/filters:focal(2569x1552:3547x2530):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/57059063/shutterstock_560011798.0.jpg'
    },
    {
      name: 'CCNY',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGWTXN56Z617ji8D4QUgZ0H2k4Vx1PrazSGxtUX7DyQbfDXGd'
    },
    {
      name: 'Brown'
    },
    {
      name: 'Apex Tech',
      imageURL: 'https://i.ytimg.com/vi/W-aPfjqcslo/hqdefault.jpg'
    }
  ];
  const _students = [
    {
      firstName: 'Moe',
      lastName: 'Jones',
      email: 'moe@gmail.com',
      password: 'MOE'
    },
    {
      firstName: 'Larry',
      lastName: 'Smith',
      email: 'larry@gmail.com',
      password: 'LARRY'
    },
    {
      firstName: 'Curly',
      lastName: 'Adams',
      email: 'curly@gmail.com',
      password: 'CURLY'
    },
    {
      firstName: 'Shep',
      lastName: 'Riley',
      email: 'shep@gmail.com',
      GPA: 4.0,
      password: 'SHEP'
    },
    {
      firstName: 'Ethel',
      lastName: 'Merman',
      email: 'ethel@aol.com',
      password: 'ETHEL'
    },
    {
      firstName: 'Lucy',
      lastName: 'Ball',
      email: 'lucy@gmail.com',
      password: 'LUCY'
    },
    {
      firstName: 'Red',
      lastName: 'Foxx',
      email: 'red@gmail.com',
      password: 'RED'
    },
    {
      firstName: 'Gracie',
      lastName: 'Allen',
      email: 'gracie@gmail.com',
      password: 'GRACIE'
    },
    {
      firstName: 'Carol',
      lastName: 'Burnett',
      email: 'carol@gmail.com',
      GPA: 3,
      password: 'CAROL'
    },
    {
      firstName: 'Moms',
      lastName: 'Mabley',
      email: 'moms@gmail.com',
      GPA: 3.5,
      password: 'MOMS'
    }

  ];
  const [schools, students] = await Promise.all([
    Promise.all(_schools.map( school => School.create(school))),
    Promise.all(_students.map( student => Student.create(student))),
  ]);


  const mapped =  {
    schools : schools.reduce((acc, school)=> { 
      acc[school.name] = school
      return acc;
    }, {}),
    students : students.reduce((acc, student)=> {
      acc[student.email] = student;
      return acc
    }, {})
  };
  const { Harvard, MIT, UCLA, CCNY } = mapped.schools;

  await Promise.all([
    Harvard.setStudents([
      mapped.students['moe@gmail.com'],
      mapped.students['lucy@gmail.com'],
      mapped.students['red@gmail.com'],
      mapped.students['moms@gmail.com'],
    ]),
    MIT.setStudents([
      mapped.students['ethel@aol.com'],
    ]),
    CCNY.setStudents([
      mapped.students['shep@gmail.com'],
      mapped.students['carol@gmail.com'],
    ])
  ]);

  return {
    schools : (await School.findAll()).reduce((acc, school)=> { 
      acc[school.name] = school
      return acc;
    }, {}),
    students : (await Student.findAll()).reduce((acc, student)=> {
      acc[student.email] = student;
      return acc
    }, {})
  };
};

module.exports = {
  syncAndSeed,
  conn,
  models: {
    School,
    Student
  }
};
