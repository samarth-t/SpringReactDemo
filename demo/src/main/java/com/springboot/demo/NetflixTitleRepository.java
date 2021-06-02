package com.springboot.demo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NetflixTitleRepository extends JpaRepository<NetflixTitle, String> {
    List<NetflixTitle> findByTitleContaining(String title);
}
