package com.springboot.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NetflixTitleController {

    @Autowired
    NetflixTitleRepository repository;

//    @GetMapping("/hello")
//    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
//        return String.format("Hello %s!", name);
//    }

    @GetMapping("/titles")
    public ResponseEntity<List<NetflixTitle>> getAllTitles(@RequestParam(required = false) String title) {
        try {
            List<NetflixTitle> titles = new ArrayList<NetflixTitle>();

            if(title == null) {
                titles.addAll(repository.findAll());
            } else {
                titles.addAll(repository.findByTitleContaining(title));
            }

            if(titles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(titles, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/titles/{id}")
    public ResponseEntity<NetflixTitle> getTitleById(@PathVariable("id") String id) {
        Optional<NetflixTitle> titleData = repository.findById(id);

        if(titleData.isPresent()) {
            return new ResponseEntity<>(titleData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/titles")
    public ResponseEntity<NetflixTitle> createTitle(@RequestBody NetflixTitle title) {
        try {
            NetflixTitle tempTitle = repository.save(
                    new NetflixTitle(title.getId(), title.getTitle(), title.getDirector(), title.getCast(),
                            title.getCountry(), title.getDateAdded(), title.getReleaseYear(), title.getRating(),
                            title.getDuration(), title.getListedIn(), title.getDescription()));
            return new ResponseEntity<>(tempTitle, HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/titles/{id}")
    public ResponseEntity<NetflixTitle> updateTitle(@PathVariable("id") String id, @RequestBody NetflixTitle title) {
        Optional<NetflixTitle> tutorialData = repository.findById(id);

        if(tutorialData.isPresent()) {
            NetflixTitle newTitle = tutorialData.get();

            newTitle.setId(title.getId());
            newTitle.setTitle(title.getTitle());
            newTitle.setDirector(title.getDirector());
            newTitle.setCast(title.getCast());
            newTitle.setCountry(title.getCountry());
            newTitle.setDateAdded(title.getDateAdded());
            newTitle.setReleaseYear(title.getReleaseYear());
            newTitle.setRating(title.getRating());
            newTitle.setDuration(title.getDuration());
            newTitle.setListedIn(title.getListedIn());
            newTitle.setDescription(title.getDescription());

            return new ResponseEntity<>(repository.save(newTitle), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/titles/{id}")
    public ResponseEntity<HttpStatus> deleteTitle(@PathVariable("id") String id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/titles")
    public ResponseEntity<HttpStatus> deleteAllTitles() {
        try {
            repository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
