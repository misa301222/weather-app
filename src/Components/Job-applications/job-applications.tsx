import '././job-applications.scss';
import axios from 'axios';
import { useEffect } from 'react';

const jobApplicationsURL = "https://localhost:5001/api/JobApplications";

function JobApplications() {

    const getAllJobApplications = async () => {
        await axios.get(jobApplicationsURL).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllJobApplications();
    }, [])

    return (
        <div className="container job-application-component">
            this works
        </div>
    )
}

export default JobApplications;