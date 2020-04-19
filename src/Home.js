import React from 'react';
import { connect } from 'react-redux';
import { mostPopular, topSchool } from './utils';
import { Link } from 'react-router-dom';

const Home = ({ mostPopular, topSchool })=> {
  return (
    <div>
      <h2>Home</h2>
      {
        !!mostPopular.id && (
          <div>
            Our most popular school is <Link to={`/schools/${mostPopular.id}`}>{ mostPopular.name }</Link> with { mostPopular.enrollment } students.
          </div>
        )
      }
      {
        !!topSchool.id && (
          <div>
            Our top performing school is <Link to={`/schools/${topSchool.id}`}>{ topSchool.name }</Link> with an average GPA of { topSchool.average }
          </div>
        )
      }
    </div>
  );
};

export default connect((state)=> {
  return {
    mostPopular: mostPopular(state),
    topSchool: topSchool(state)
  };
})(Home);
