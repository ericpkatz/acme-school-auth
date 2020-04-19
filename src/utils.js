const schoolMap = (state)=> {
  return state.schools.reduce((acc, school)=> {
    acc[school.id] = school;
    return acc;
  }, {});

};

const schoolStudentMap = (state)=> {
  return state.students.reduce((acc, student)=> {
    if(student.schoolId){
      acc[student.schoolId] = acc[student.schoolId] || [];
      acc[student.schoolId].push(student);
    }
    return acc;
  }, {});

};

const mostPopular = (state)=> {
  const map = schoolStudentMap(state);
  const _schoolMap = schoolMap(state); 
  let mostPopular = {};
  let max;
  if(!Object.keys(map).length){
    return mostPopular;
  }
  Object.keys(map).forEach( key => {
    if(!max || map[key].length > max){
      mostPopular = _schoolMap[key] || {};
      max = map[key].length;
    }
  });
  return {...mostPopular, enrollment: max };
};

const average = (students)=> {
  return students.reduce((acc, student)=> {
    acc = acc + student.GPA;
    return acc;
  }, 0)/students.length;
};

const topSchool = (state)=> {
  const map = schoolStudentMap(state);
  const _schoolMap = schoolMap(state); 
  let _top = {};
  let max;
  if(!Object.keys(map).length){
    return _top;
  }
  Object.keys(map).forEach( key => {
    const _average = average(map[key]);
    if(!max || _average > max){
      _top = _schoolMap[key] || {};
      max = _average;
    }
  });
  return {..._top, average: max };
};

export { schoolMap, schoolStudentMap, mostPopular, topSchool };
