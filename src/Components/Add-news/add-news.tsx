import { useEffect, useState } from 'react';
import '././add-news.scss';
import axios from 'axios';
import Swal from 'sweetalert2';

const newsURL = 'https://localhost:5001/api/News';
const notificationTypesURL = 'https://localhost:5001/api/NotificationTypes';
function AddNews() {

    const [notificationTypes, setNotificationTypes] = useState([{
        notificationTypeId: 0,
        notificationTypeDescription: ''
    }]);

    const [news, setNews] = useState({
        header: '',
        body: '',
        publishedDate: new Date(),
        imageURL: '',
        notificationType: 0,
        reactionLike: 0,
        reactionWow: 0,
        reactionSad: 0,
        reactionAngry: 0        
    });

    const handleOnChangeHeader = (event: any) => {
        setNews(prev => ({ ...prev, header: event.target.value }))
    }

    const handleOnChangeBody = (event: any) => {
        setNews(prev => ({ ...prev, body: event.target.value }))
    }

    const handleOnChangeImageURL = (event: any) => {
        setNews(prev => ({ ...prev, imageURL: event.target.value }))
    }

    const handleOnChangeNotificationType = (event: any) => {
        setNews(prev => ({ ...prev, notificationType: event.target.value }))
    }

    const handleOnSubmitForm = async (event: any) => {
        event.preventDefault();

        let body = {
            header: news.header,
            body: news.body,
            publishedDate: new Date(),
            imageURL: news.imageURL,
            notificationType: news.notificationType,
            reactionLike: 0,
            reactionWow: 0,
            reactionSad: 0,
            reactionAngry: 0
        }

        await axios.post(newsURL, body).then(response => {
            console.log(response);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'News Added succesfully!',
                showConfirmButton: false,
                timer: 1100
            })
        }).catch(err => {
            console.log(err);
        });
    }

    const getAllNotificationType = async () => {
        await axios.get(notificationTypesURL).then(response => {
            setNotificationTypes(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllNotificationType();
    }, [])

    return (
        <div className="container container-data add-news-component">
            <div className="header">
                <h2 className="yellowish fw-bold">Add news</h2>
                <hr></hr>
            </div>

            <div className="container d-flex justify-content-center">
                <div className="card shadow w-75 text-start">
                    <form onSubmit={handleOnSubmitForm}>
                        <div className="card-header text-center fw-bold">
                            Add News
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="inputHeader" className="form-label fw-bold">Header</label>
                                <input type="text" className="form-control" id="inputHeader" onChange={handleOnChangeHeader} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputBody" className="form-label fw-bold">Notice</label>
                                <textarea className="form-control" id="inputBody" rows={10} onChange={handleOnChangeBody} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputImageURL" className="form-label fw-bold">Image URL (optional)</label>
                                <input type="text" className="form-control" id="inputImageURL" onChange={handleOnChangeImageURL} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputNotificationType" className="form-label fw-bold">Notification Type</label>
                                <select className="form-select" aria-label="Default select example" name="notificationTypeId" id="inputNotificationType" onChange={handleOnChangeNotificationType} >
                                    {
                                        notificationTypes.map((notificationType, index) => (
                                            <option key={index} value={notificationType.notificationTypeId}> {notificationType.notificationTypeDescription} </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-3 text-center">
                                <button type="submit" className="btn btn-success">Send</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddNews;