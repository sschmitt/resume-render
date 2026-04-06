import React, { Fragment, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FaLinkedin, FaCalendarAlt, FaEdit, FaEye, FaColumns } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { yaml as yamlLang } from '@codemirror/lang-yaml';
import { EditorView } from '@codemirror/view';
import yaml from 'js-yaml';
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
    let today = new Date()
    document.title = props.profile.name + ' Resume ' + today.toISOString().split('T')[0];
  });

  return (
    <div className="w3-margin-top w3-margin-bottom w3-white top-container">
      {props.onEdit && <FaEdit className="no-print edit-btn" onClick={props.onEdit}/>}
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

function Toolbar({ onPreview, onSplit, onEditOnly, error }) {
  return (
    <div className="editor-toolbar">
      {onPreview && (
        <button className="editor-preview-btn" onClick={onPreview}>
          <FaEye className="icon"/> Preview
        </button>
      )}
      {onSplit && (
        <button className="editor-preview-btn" onClick={onSplit}>
          <FaColumns className="icon"/> Split
        </button>
      )}
      {onEditOnly && (
        <button className="editor-preview-btn" onClick={onEditOnly}>
          <FaEdit className="icon"/> Edit Only
        </button>
      )}
      {error && <span className="editor-error">{error}</span>}
    </div>
  );
}

function Editor({ yamlText, onChange, onPreview, onSplit, error }) {
  return (
    <div className="editor-container">
      <Toolbar onPreview={onPreview} onSplit={onSplit} error={error}/>
      <CodeMirror
        value={yamlText}
        height="calc(100vh - 3rem)"
        extensions={[yamlLang(), EditorView.lineWrapping]}
        onChange={onChange}
      />
    </div>
  );
}

function SplitView({ yamlText, onChange, onPreview, onEditOnly, resume, error }) {
  return (
    <div className="split-container">
      <Toolbar onPreview={onPreview} onEditOnly={onEditOnly} error={error}/>
      <div className="split-body">
        <div className="split-editor">
          <CodeMirror
            value={yamlText}
            height="calc(100vh - 3rem)"
            extensions={[yamlLang(), EditorView.lineWrapping]}
            onChange={onChange}
          />
        </div>
        <div className="split-preview w3-grey">
          {resume && <Resume {...resume}/>}
        </div>
      </div>
    </div>
  );
}

function ResumeApp() {
  const [mode, setMode] = useState('view');
  const [yamlText, setYamlText] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/resume.yaml')
      .then(r => r.text())
      .then(text => {
        setYamlText(text);
        setResume(yaml.load(text));
      });
  }, []);

  const handleChange = (text) => {
    setYamlText(text);
    try {
      setResume(yaml.load(text));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handlePreview = () => {
    try {
      setResume(yaml.load(yamlText));
      setError(null);
      setMode('view');
    } catch (e) {
      setError(e.message);
    }
  };

  if (!resume) return null;

  if (mode === 'edit') {
    return (
      <Editor
        yamlText={yamlText}
        onChange={handleChange}
        onPreview={handlePreview}
        onSplit={() => setMode('split')}
        error={error}
      />
    );
  }

  if (mode === 'split') {
    return (
      <SplitView
        yamlText={yamlText}
        onChange={handleChange}
        onPreview={handlePreview}
        onEditOnly={() => setMode('edit')}
        resume={resume}
        error={error}
      />
    );
  }

  return <Resume {...resume} onEdit={() => setMode('edit')} />;
}

// ========================================

const root = createRoot(document.getElementById('root'));
root.render(<ResumeApp />);
