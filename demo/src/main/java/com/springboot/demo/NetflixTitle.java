package com.springboot.demo;

import javax.persistence.*;

@Entity
@Table(name = "netflixtable")
public class NetflixTitle {
    @Id
    @Column(name = "show_id")
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "director")
    private String director;

    @Column(name = "cast")
    private String cast;

    @Column(name = "country")
    private String country;

    @Column(name = "date_added")
    private String dateAdded;

    @Column(name = "release_year")
    private int releaseYear;

    @Column(name = "rating")
    private String rating;

    @Column(name = "duration")
    private String duration;

    @Column(name = "listed_in")
    private String listedIn;

    @Column(name = "description")
    private String description;

    public NetflixTitle() { }

    public NetflixTitle(String showId, String title, String director, String cast, String country, String dateAdded,
                        int releaseYear, String rating, String duration, String listedIn, String description) {
        this.id = showId;
        this.title = title;
        this.director = director;
        this.cast = cast;
        this.country = country;
        this.dateAdded = dateAdded;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.duration = duration;
        this.listedIn = listedIn;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String show_id) {
        this.id = show_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(String date_added) {
        this.dateAdded = date_added;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int release_year) {
        this.releaseYear = release_year;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getListedIn() {
        return listedIn;
    }

    public void setListedIn(String listed_in) {
        this.listedIn = listed_in;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
