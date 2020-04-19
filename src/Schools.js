import React from 'react';
import { Link } from 'react-router-dom';
import  { connect } from 'react-redux'; 
import SchoolImageTile from './common/SchoolImageTile';
import { schoolMap, schoolStudentMap } from './utils';
import StudentDropDown from './common/StudentDropDown';




const _Schools = ({ schools, schoolMap, schoolStudentMap, students })=> {
  return (
    <div className='tiles'>
      {
        schools.map( school => {
          return (
          <div key={ school.id } >
          <h4>
            <Link to={`/schools/${school.id}`}>
            { school.name }
            </Link>
          </h4>
          <SchoolImageTile schoolId={ school.id } schoolMap={ schoolMap } />
          <div>Student Count { schoolStudentMap[school.id] ? schoolStudentMap[school.id].length : '0'}</div>
          <StudentDropDown school={ school } excluded={ schoolStudentMap[school.id] || []}/>
          </div>
          )
        })
      }
    </div>
  );
};

export default connect(( state ) => {
  return {
    ...state, schoolMap: schoolMap(state), schoolStudentMap: schoolStudentMap(state)
  };
})(_Schools);

