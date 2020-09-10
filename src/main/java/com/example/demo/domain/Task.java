package com.example.demo.domain;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import lombok.Data;

// @Entity
@Component
@Data
public class Task {


  // private String id = new ObjectId().toString();
  private String text = "Things to do...";
  private long createDate = new Date().getTime();
  // private long dueDate = 0;
  private boolean complete = false;
  private boolean incomplete = false;

  public Task() {
  }
}