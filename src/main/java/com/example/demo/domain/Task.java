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


  private String id = new ObjectId().toString();
  private String text = "Things to do...";
  private long lastModifiedDate;
  private long dueDate = 0;
  private boolean complete = false;
  private boolean incomplete = false;
  private boolean remove = false;

  public Task() {
    this.lastModifiedDate = new Date().getTime();
  }

  public Task(String text, boolean complete, boolean incomplete, boolean remove, long dueDate) {
    this.text = text;
    this.complete = complete;
    this.incomplete = incomplete;
    this.remove = remove;
    this.dueDate = dueDate;
    this.lastModifiedDate = new Date().getTime();
  }


  @Override
	public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Task task = (Task) o;
    return Objects.equals(id, task.id);
  }

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}