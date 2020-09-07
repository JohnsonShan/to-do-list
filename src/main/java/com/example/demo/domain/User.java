/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.example.demo.domain;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.Assert;

// import com.fasterxml.jackson.databind.annotation.;
import lombok.Data;

@Data
@Document(collection = "users")
public class User {

  public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

  @Id
  private String id;
  private String name;
  private String password;
  private String email;
  private @Version @JsonIgnore Long version;
  private long lastModifiedDate = new Date().getTime();
  private @JsonIgnore String[] roles = { "ROLE_USER" };
  private Set<Task> tasks = new HashSet<Task>();

  public void setPassword(String password) {
    this.password = PASSWORD_ENCODER.encode(password);
  }

  protected User() {
  }

  public User(String name, String password, String email) {
    this.name = name;
    this.setPassword(password);
    this.email = email;
    this.add(new Task());
  }

  public User(String name, String password, String email, String... roles) {
    this.name = name;
    this.setPassword(password);
    this.email = email;
    this.roles = roles;
    this.add(new Task());

  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }
  public void setLastModifiedDate(long d){
    this.lastModifiedDate = d;
  }
  public boolean add(Task task) {

    // Assert.notNull(task);
    return this.tasks.add(task);
  }

  public boolean remove(Task task) {

    // Assert.notNull(task);

    return this.tasks.remove(task);

  }

  public void setTasks(Task[] tasks) {
    this.tasks.clear();
    for (int i = 0; i < tasks.length; i++) {
      this.tasks.add(tasks[i]);
    }

  }

  public Set<Task> getTasks() {
    return Collections.unmodifiableSet(tasks);
  }

  public String[] getRoles() {
    return roles;
  }

  public boolean equals(User user) {
    return this.id == user.id;
  }
}
