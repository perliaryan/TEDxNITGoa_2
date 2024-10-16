function TeamMember({ name, role, image, phone, linkedin, instagram, email }) {
    return (
        <div className="team-member-card">
            <img src={image} alt={name} className="member-photo" />
            <h3>{name}</h3>
            <p>{role}</p>
            <p>{phone}</p>
            <div className="social-links">
                
                <a className="socialImg" href={instagram}><img src='socialHandle/insta.svg' style={{ filter: 'invert(1)' }}></img></a>
                <a className="socialImg" href={linkedin}><img src='socialHandle/linkedin.svg' style={{ filter: 'invert(1)' }}></img></a>
                <a className="socialImg" href={email}><img src='socialHandle/email.svg' style={{ filter: 'invert(1)' }}></img></a>
            </div>
        </div>
    );
}

export default TeamMember;
