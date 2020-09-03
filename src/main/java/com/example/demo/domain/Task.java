package com.example.toDoList.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import lombok.Data;

// @Entity
@Component
@Data
public class Task {

  private String text = "New task!";
  // private long createDate;
  // private long dueDate = 0;
  private String backgroundColor = "white";
  private boolean complete = false;
  // private boolean incomplete = false;
  // private boolean highlight = false;
  private boolean deleted = false;

  public Task() {
    // this.createDate = new Date().getTime();
  }

  public Task(String text, boolean highlight, String color) {
    this.text = text;
    // this.createDate = new Date().getTime();
  }

}