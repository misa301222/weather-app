import './news.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CatImage from '../../resources/images/Cat.png';
import moment from 'moment';
import { Link } from 'react-router-dom';

const newsURL = 'https://localhost:5001/api/News';
const notificationTypesURL = 'https://localhost:5001/api/NotificationTypes';

function News() {

    const [news, setNews] = useState([{
        newsId: 0,
        header: '',
        body: '',
        publishedDate: new Date(),
        imageURL: '',
        notificationType: 0,
        reactionLike: 0,
        reactionWow: 0,
        reactionSad: 0,
        reactionAngry: 0
    }])

    const [notificationTypes, setNotificationTypes] = useState([{
        notificationTypeId: 0,
        notificationTypeDescription: ''
    }]);

    const getAllNews = async () => {
        await axios.get(newsURL + '/GetNewsByDateDesc').then(response => {
            console.log(response);
            setNews(response.data);
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

    const getNotificationTypeDescriptionByNotificationTypeId = (notificationTypeId: number) => {
        for (let i = 0; i < notificationTypes.length; i++) {
            if (notificationTypeId === notificationTypes[i].notificationTypeId) {
                return notificationTypes[i].notificationTypeDescription;
            }
        }
    }

    const renderSwitch = (notificaitonTypeId: number) => {
        let classText = '';
        switch (notificaitonTypeId) {
            case 1:
                classText += 'bg-light';
                break;

            case 2:
                classText += 'bg-warning';
                break;

            case 3:
                classText += 'bg-danger';
                break

            case 4:
                classText += 'bg-info';
                break;
        }
        return classText;
    }

    useEffect(() => {
        getAllNews();
        getAllNotificationType();
    }, [])

    return (
        <div className="container container-data news-component">
            <div className="header">
                <h1 className="yellowish fw-bold">News <i className="fas fa-newspaper"></i> </h1>
                <hr></hr>
            </div>

            <div className="container container-news w-75">
                {
                    news.map((news, index) => (
                        <div key={index} className="element shadow">
                            <div className="header row">
                                <div className="col">
                                </div>
                                <div className="col">
                                    <h3 className="fw-bold fst-italic pink-color">{news.header}</h3>
                                </div>
                                <div className="col text-end">
                                    <h5><span className={`badge ${renderSwitch(news.notificationType)}`}>
                                        {getNotificationTypeDescriptionByNotificationTypeId(news.notificationType)}</span></h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row text-end">
                                <small className="purple fw-bold fst-italic date-text">{news.publishedDate ? moment(new Date(news.publishedDate)).format('dddd') + ' '
                                    + moment(new Date(news.publishedDate)).format('MM/DD/YYYY') : null}</small>
                            </div>
                            <br></br>
                            <br></br>
                            {news.imageURL ?
                                <img src={news.imageURL} alt="imageNews" className="thumbnail shadow" />
                                :
                                <div className="no-image d-flex flex-column align-items-center">
                                    <img src={CatImage} alt="catImage" className="cat" />
                                    <br></br>
                                    <small className="text-muted fw-bold fst-italic"><u>This news has no image. Look at this cat :)</u></small>
                                </div>
                            }
                            <br></br>
                            <br></br>
                            <div className="mb-3">
                                <Link to={{ pathname: `/news-details/${news.newsId}`, state: { News: news } }}>
                                    <button type="button" className="btn btn-light btn-outline-dark">See Full Note</button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default News;