import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './news-details.scss';
import CatImage from '../../resources/images/Cat.png';
import axios from 'axios';
import authService from '../../services/auth.service';

const notificationTypesURL = 'https://localhost:5001/api/NotificationTypes';
const newsURL = 'https://localhost:5001/api/News';
const reactionsURL = 'https://localhost:5001/api/Reactions';

interface CustomState {
    News: {
        newsId: 0,
        header: '',
        body: '',
        publishedDate: Date,
        imageURL: '',
        notificationType: 0,
        reactionLike: 0,
        reactionWow: 0,
        reactionSad: 0,
        reactionAngry: 0
    }
}

function NewsDetails() {
    const { state } = useLocation<CustomState>();
    const [notificationTypes, setNotificationTypes] = useState([{
        notificationTypeId: 0,
        notificationTypeDescription: ''
    }]);

    const [reaction, setReaction] = useState({
        email: '',
        newsId: 0,
        reactionAngry: 0,
        reactionLike: 0,
        reactionSad: 0,
        reactionWow: 0
    });

    const [user, setUser] = useState<string | null>('');

    const getUser = () => {
        setUser(authService.getCurrentUser);
    }

    const [totalReactions, setTotalReactions] = useState({
        newsId: 0,
        reactionLike: 0,
        reactionWow: 0,
        reactionSad: 0,
        reactionAngry: 0
    });

    const getNotificationTypeDescriptionByNotificationTypeId = (notificationTypeId: number) => {
        for (let i = 0; i < notificationTypes.length; i++) {
            if (notificationTypeId === notificationTypes[i].notificationTypeId) {
                return notificationTypes[i].notificationTypeDescription;
            }
        }
    }

    const getAllNotificationType = async () => {
        await axios.get(notificationTypesURL).then(response => {
            setNotificationTypes(response.data);
        }).catch(err => {
            console.log(err);
        });
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

    const handleLike = async (reactionType: string) => {
        let body = {
            Email: user,
            NewsId: state.News.newsId,
            ReactionLike: 0,
            ReactionWow: 0,
            ReactionSad: 0,
            ReactionAngry: 0
        }

        switch (reactionType) {
            case 'Like':
                body.ReactionLike = 1;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 0,
                    reactionLike: 1,
                    reactionSad: 0,
                    reactionWow: 0
                });
                break;

            case 'Wow':
                body.ReactionWow = 1;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 0,
                    reactionLike: 0,
                    reactionSad: 0,
                    reactionWow: 1
                });
                break;

            case 'Sad':
                body.ReactionSad = 1;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 0,
                    reactionLike: 0,
                    reactionSad: 1,
                    reactionWow: 0
                });
                break;

            case 'Angry':
                body.ReactionAngry = 1;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 1,
                    reactionLike: 0,
                    reactionSad: 0,
                    reactionWow: 0
                });
                break;
        }

        await axios.post(reactionsURL + '/UpdateReaction', body).then(response => {
            console.log(response);
        }).then(() => {
            getTotalReactionsByNewsId();
        }).catch(err => {
            console.log(err);
        });
    }

    const handleDislike = async (reactionType: string) => {
        let body = {
            Email: user,
            NewsId: state.News.newsId,
            ReactionLike: 0,
            ReactionWow: 0,
            ReactionSad: 0,
            ReactionAngry: 0
        }

        switch (reactionType) {
            case 'Like':
                body.ReactionLike = 0;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 0,
                    reactionLike: 0,
                    reactionSad: 0,
                    reactionWow: 0
                });
                break;

            case 'Wow':
                body.ReactionWow = 0;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 0,
                    reactionLike: 0,
                    reactionSad: 0,
                    reactionWow: 0
                });
                break;

            case 'Sad':
                body.ReactionSad = 0;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 0,
                    reactionLike: 0,
                    reactionSad: 0,
                    reactionWow: 0
                });
                break;

            case 'Angry':
                body.ReactionAngry = 0;
                setReaction({
                    email: user as string,
                    newsId: state.News.newsId,
                    reactionAngry: 0,
                    reactionLike: 0,
                    reactionSad: 0,
                    reactionWow: 0
                });
                break;
        }

        await axios.post(reactionsURL + '/UpdateReaction', body).then(response => {
            console.log(response);
        }).then(() => {
            getTotalReactionsByNewsId();
        }).catch(err => {
            console.log(err);
        });
    }

    const getReactionByEmailAndNewsId = async (email: string, newsId: number) => {
        await axios.get(reactionsURL + '/GetReactionByEmailAndNewsId/' + email + '/' + newsId).then(response => {
            console.log(response.data);
            setReaction(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getTotalReactionsByNewsId = async () => {
        await axios.get(reactionsURL + '/GetReactionByNewsId/' + state.News.newsId).then(response => {
            console.log(response);
            setTotalReactions(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        console.log(state);
        getAllNotificationType();
        getUser();
        getReactionByEmailAndNewsId(authService.getCurrentUser as string, state.News.newsId);
        getTotalReactionsByNewsId();
    }, [])

    return (
        <div className="container container-data news-details-component">
            <div className="news-info shadow">
                <div className="header row">
                    <div className="col">
                    </div>
                    <div className="col">
                        <h3 className="fw-bold fst-italic pink-color">{state.News.header}</h3>
                    </div>
                    <div className="col text-end">
                        <h5><span className={`badge ${renderSwitch(state.News.notificationType)}`}>
                            {getNotificationTypeDescriptionByNotificationTypeId(state.News.notificationType)}</span></h5>
                    </div>
                </div>

                <div className="body container d-flex flex-column align-items-center">
                    {
                        state.News.imageURL ?
                            <img src={state.News.imageURL} alt="newsImage" className="body-image" />
                            :
                            <div className="container d-flex flex-column align-items-center">
                                <img src={CatImage} alt="catImage" className="not-found" />
                                <small className="fw-bold fst-italic text-muted">You've seen this cat enough i think...</small>
                            </div>
                    }

                    <div className="body-info fw-bold text-start w-75">
                        <hr></hr>
                        <p>
                            {state.News.body}
                        </p>
                    </div>
                </div>
            </div>
            <div className="reactions d-flex justify-content-end flex-row">
                <div className="reaction-bar d-flex justify-content-evenly shadow">
                    {reaction.reactionLike == 1 ?
                        <div className='container d-flex flex-column w-25'>
                            <button type="button" onClick={async () => handleDislike('Like')} id="btnLike" className="btn btn-lg btn-light btn-outline-dark reaction-element btnLike-selected"><i className="far fa-thumbs-up"></i></button>
                            {totalReactions.reactionLike >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionLike}</small> : null}
                        </div> :
                        <div className='container d-flex flex-column w-25'>
                            <button type="button" onClick={async () => handleLike('Like')} id="btnLike" className="btn btn-lg btn-light btn-outline-dark reaction-element btnLike-not-selected"><i className="far fa-thumbs-up"></i></button>
                            {totalReactions.reactionLike >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionLike}</small> : null}
                        </div>}

                    {reaction.reactionWow == 1 ?
                        <div className='container d-flex flex-column w-25'>
                            <button type="button" onClick={async () => handleDislike('Wow')} id="btnWow" className="btn btn-lg btn-light btn-outline-dark reaction-element btnWow-selected"><i className="far fa-surprise"></i></button>
                            {totalReactions.reactionWow >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionWow}</small> : null}
                        </div> :
                        <div className='container d-flex flex-column w-25'>
                            <button type="button" onClick={async () => handleLike('Wow')} id="btnWow" className="btn btn-lg btn-light btn-outline-dark reaction-element btnWow-not-selected"><i className="far fa-surprise"></i></button>
                            {totalReactions.reactionWow >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionWow}</small> : null}
                        </div>}

                    {reaction.reactionSad == 1 ?
                        <div className='container d-flex flex-column w-25'>
                            <button type="button" onClick={async () => handleDislike('Sad')} id="btnSad" className="btn btn-lg btn-light btn-outline-dark reaction-element btnSad-selected"><i className="far fa-sad-cry"></i></button>
                            {totalReactions.reactionSad >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionSad}</small> : null}
                        </div> :
                        <div className='container d-flex flex-column w-25'>
                            <button type="button" onClick={async () => handleLike('Sad')} id="btnSad" className="btn btn-lg btn-light btn-outline-dark reaction-element btnSad-not-selected"><i className="far fa-sad-cry"></i></button>
                            {totalReactions.reactionSad >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionSad}</small> : null}
                        </div>}

                    {reaction.reactionAngry == 1 ? <div className='container d-flex flex-column w-25'>
                        <button type="button" onClick={async () => handleDislike('Angry')} id="btnAngry" className="btn btn-lg btn-light btn-outline-dark reaction-element btnAngry-selected"><i className="far fa-angry"></i></button>
                        {totalReactions.reactionAngry >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionAngry}</small> : null}
                    </div> :
                        <div className='container d-flex flex-column w-25'>
                            <button type="button" onClick={async () => handleLike('Angry')} id="btnAngry" className="btn btn-lg btn-light btn-outline-dark reaction-element btnAngry-not-selected"><i className="far fa-angry"></i></button>
                            {totalReactions.reactionAngry >= 0 ? <small className="text-dark fw-bold">{totalReactions.reactionAngry}</small> : null}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default NewsDetails;