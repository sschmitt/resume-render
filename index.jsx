import React, { Fragment, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { FaLinkedin, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import './index.css';

function Card(props) {
  return (
    <Fragment>
      <h3><b>{props.title}</b></h3>
      <div className="card-body">
        {props.content}
      </div>
    </Fragment>
  );
}

function Location(props) {
  const link = false;
  if (link) {
    return (
      <a href={"https://maps.google.com/?q=" + props.location} target="_blank" rel="noreferrer">
        <span className="material-icons">place</span>
        {props.location}
      </a>
    );
  } else {
    return (
      <span className="icon-text">
        <span className="material-icons">place</span>
        {props.location}
      </span>
    );
  }
}

function DateRange(props) {
  return (
    <span className="icon-text">
      <FaCalendarAlt className="icon icon-cal"/>
      {/*<span className="material-icons">calendar_month</span>*/}
      {props.start != null && props.start + " - "}{props.end != null ? props.end : <span className="w3-tag w3-dark-grey w3-round">Present</span>}
    </span>
  );
}

function Employer(props) {
  return (
    <Fragment>
      <div className="hvcontainer">
        <div className="hvitem">
          <h4><b>{props.employer}</b></h4>
        </div>
        <div className="hvitem">
          <div className="w3-text-grey"><Location location={props.location}/></div>
        </div>
      </div>
      {props.positions.map((position, j) => {
        return (
          <Position
            key={j}
            {...position}
          />
        );
      })}
    </Fragment>
  );
}

function Position(props) {
  const bullets = props.bullets == null ? "" : props.bullets.map((text, i) =>
    <li key={i}>{text}</li>
  );
  var style;
  if (props.narrow === true) {
    style = {flexDirection: "column"};
  } else {
    style = {flexDirection: "row"};
  }
  return (
    <div>
      <div className="hvcontainer" style={style}>
        <div className="hvitem">
          <h5><b>{props.title}</b>{props.alt_title != null && ' ('+props.alt_title+')'}</h5>
        </div>
        <div className="hvitem">
          <p className="w3-text-grey">
            <DateRange
              start={props.start}
              end={props.end}
            />
          </p>
        </div>
      </div>
      <p>{props.summary}</p>
      {props.bullets != null && (
        <ul>
          {bullets}
        </ul>
      )}
    </div>
  );
}

function Name(props) {
  return (
    <div className="hvcontainer hvcontainer-space" style={{
      borderBottom: "2px solid black",
      paddingBottom: "1rem",
    }}>
      <div className="hvitem">
        <h1>{props.name}</h1>
        <div className="hvcontainer">
          <div className="hvitem">
            <h2>{props.occupation}</h2>
          </div>
        </div>
      </div>
      <div className="hvitem">
        {!!props.location && (
          <p><Location location={props.location}/></p>
        )}
        {!!props.email && (
          <p><a className="icon-text" href={"mailto:" + props.email}>
            <span className="material-icons">email</span>{props.email}
          </a></p>
        )}
        {!!props.tel && (
          <p><a className="icon-text" href={"tel:" + props.tel}>
            <span className="material-icons">phone</span>{props.tel}
          </a></p>
        )}
        {!!props.linkedin && (
          <p><a className="icon-text" href={"https://www.linkedin.com/in/" + props.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin className="icon"/>
            /{props.linkedin}
          </a></p>
        )}
      </div>
    </div>
  );
}

function Skills(props) {
  const skills = props.skills.map((row, i) => {
    return (
      <div className="text-line" key={i}>
        {row.map((skill, j) => {
          if (props.tags) {
            return (
              <span className="w3-tag w3-teal w3-round" key={skill}>{skill}</span>
            );
          } else {
            return (
              <span key={j}>
              {j > 0 && ", "}
              {skill}
              </span>
            );
          }
        })}
        {i != props.skills.length-1 && ";"}
      </div>
    );
  });
  return (
    <Card
      title="Skills"
      content={
        <div>
          {skills}
        </div>
      }
    />
  );
}

function Experience(props) {
  return (
    <Card
      title="Experience"
      content={
        <Fragment>
          {props.experience.map((employer, i) => {
            return (
              <Employer
                key={i}
                {...employer}
              />
            );
          })}
        </Fragment>
      }
    />
  );
}

function Projects(props) {
  return (
    <Card
      title="Projects"
      content={
        <Fragment>
          {props.projects.map((project, i) => {
            return (
              <Position
                key={i}
                {...project}
              />
            );
          })}
        </Fragment>
      }
    />
  );
}

function School(props) {
  const degrees = props.degrees.map((degree, i) => {
    return (
      <Fragment key={i}>
        {degree}<br/>
      </Fragment>
    );
  });
  return (
    <div>
      <h5><b>{props.school}</b></h5>
      <div className="w3-text-grey">
        <Location location={props.location}/>
      </div>
      <p className="w3-text-grey">
        <DateRange
          start={props.start}
          end={props.end}
        />
      </p>
      <p>{degrees}</p>
    </div>
  );
}

function Education(props) {
  return (
    <Card
      title="Education"
      content={
        <Fragment>
          {props.schools.map((school, i) => {
            return (
              <School
                key={i}
                {...school}
              />
            );
          })}
          
          {props.internships && props.internships.length > 0 && (
            <Fragment>
              <h4><b>Internships</b></h4>
              {props.internships.map((internship, i) => {
                return (
                  <Position
                    key={i}
                    narrow={true}
                    {...internship}
                  />
                );
              })}
            </Fragment>
          )}
        </Fragment>
      }
    />
  );
}

function Resume(props) {
  useEffect(() => {
    // Update the document title using the browser API
    let today = new Date()
    document.title = props.profile.name + ' Resume ' + today.toISOString().split('T')[0];
  });

  return (
    // Page Container
    <div className="w3-margin-top w3-margin-bottom w3-white top-container">
      <FaEdit className="no-print"/>
      <Name
        {...props.profile}
      />

      {/*The Grid*/}
      <div className="hvcontainer hvcontainer-center">

        {/*Left Column*/}
        <div className="w3-third">
          <Skills
            // tags
            skills={props.skills}
          />
          <Education
            {...props.education}
          />
          <Projects
            projects={props.projects}
          />
        </div>

        {/*Right Column*/}
        <div className="w3-twothird">
          <Experience
            experience={props.experience}
          />
        </div>
      </div>
    </div>
  );
}

// function Editor(props) {
//   return (
    
//   );
// }

function ResumeApp(props) {
  return (
    // <Editor text={props.text} />,
    <Resume {...props.resume} />
  );
}

// ========================================

import yaml from 'js-yaml';
import resumeFile from './resume.yaml?url';

const root = createRoot(document.getElementById('root'));
fetch(resumeFile)
  .then(r => r.text())
  .then(text => {
    const resume = yaml.load(text);
    // console.log(yaml.dump(resume));
    root.render(<Resume {...resume} />);
  });
