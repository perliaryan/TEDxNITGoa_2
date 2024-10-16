import TeamSection from './TeamSection';
import teamData from './teamData';  // Import the data for team members

function Team() {
    return (
        <>
            <div className="team-box">
                <h1>Our Amazing Team</h1>
                <div className="team-container">
                    {teamData.map((section, idx) => (
                        <TeamSection key={idx} title={section.title} members={section.members} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Team;
