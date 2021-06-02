import React, { useState, useEffect } from "react";
import TitleDataService from "../services/TitleService";

const Title = props => {
    const initialTitleState = {
        id: null,
        title: "",
        director: "",
        cast: "",
        country: "",
        dateAdded: "",
        releaseYear: -1,
        rating: "",
        duration: "",
        listedIn: "",
        description: ""
    };

    const [currentTitle, setCurrentTitle] = useState(initialTitleState);
    const [message, setMessage] = useState("");

    const getTitle = id => {
        TitleDataService.get(id)
            .then(response => {
                setCurrentTitle(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTitle(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentTitle({ ...currentTitle, [name]: value });
    };

    const updateTitle = () => {
        TitleDataService.update(currentTitle.id, currentTitle)
        .then(response => {
            console.log(response.data);
            setMessage("The title was updated successfully.");
        })
        .catch(e => {
            console.log(e);
        });
    };

    const deleteTitle = () => {
        TitleDataService.remove(currentTitle.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/titles");
            setMessage("The title was deleted successfully.");
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div>
        {currentTitle ? (
            <div className="edit-form">
                <h4>Current Title</h4>

                <form>
                    <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={currentTitle.title}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="director">Director</label>
                    <input
                        type="text"
                        className="form-control"
                        id="director"
                        name="director"
                        value={currentTitle.director}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="cast">Cast</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cast"
                        name="cast"
                        value={currentTitle.cast}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={currentTitle.country}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="dateAdded">Date Added</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateAdded"
                        name="dateAdded"
                        value={currentTitle.dateAdded}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="releaseYear">Release Year</label>
                    <input
                        type='number'
                        min={1000}
                        max={9999}
                        className="form-control"
                        id="releaseYear"
                        name="releaseYear"
                        value={currentTitle.releaseYear}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={currentTitle.rating}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input
                        type="text"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={currentTitle.duration}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="listedIn">Listed In</label>
                    <input
                        type="text"
                        className="form-control"
                        id="listedIn"
                        name="listedIn"
                        value={currentTitle.listedIn}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={currentTitle.description}
                        onChange={handleInputChange}
                    />
                    </div>
                </form>
        
                <button className="badge badge-danger mr-2" onClick={deleteTitle}>
                    Delete
                </button>
        
                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateTitle}
                >
                    Update
                </button>

                <p>{message}</p>

            </div>
        ) : (
            
        <div> 
            <br />
            <p>Please click on a Title...</p>
        </div>
        
        )}
        </div>
    );
};

export default Title;