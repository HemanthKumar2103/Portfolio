function SkillList({ src, skill }) {
    return (
      <span title={skill}>
        <img src={src} alt="Checkmark icon" />
        <p>{skill}</p>
      </span>
    );
  }
  
  export default SkillList;
