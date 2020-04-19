import React from 'react';

export default ({ schoolId, schoolMap })=> {
  if(!schoolMap[schoolId]){
    return null;
  }
  const school = schoolMap[schoolId];
  return (
    <div className='school-logo' style={{ backgroundImage: `url('${ school.imageURL}')`}}>
    </div>
  );

};
