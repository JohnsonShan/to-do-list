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
package com.example.toDoList;

import com.example.toDoList.domain.User;
import com.example.toDoList.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// tag::code[]
@Component // <1>
public class DatabaseLoader implements CommandLineRunner { // <2>

	// @Autowired
	// AdminRepository AdminRepository;



	@Autowired
	UserRepository UserRepository;

	@Override
	public void run(final String... strings) throws Exception { // <4>

		deleteAll();
		addSampleData();
		listAll();
	}

	public void deleteAll() {
		System.out.println("Deleting all records..");
		UserRepository.deleteAll();
	}

	public void addSampleData() {
		System.out.println("Adding sample data");

		User johnson = new User("johnson", "johnsonabcd", "johnson@gmail.com","ROLE_ADMIN");
		UserRepository.save(johnson);

		UserRepository.save(new User("admin", "adminabcd", "admin@gmail.com"));		
		UserRepository.save(new User("user", "userabcd", "userabcd@gmail.com"));
		UserRepository.save(new User("peter", "peterabcd", "peter@gmail.com"));


	}

	public void listAll() {
		System.out.println("Listing sample data");
		UserRepository.findAll().forEach(p -> System.out.println(p.toString()));

	}

}
// end::code[]
