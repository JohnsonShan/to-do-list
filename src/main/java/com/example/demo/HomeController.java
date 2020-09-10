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
package com.example.demo;

import java.util.Date;
import java.util.Set;

import com.example.demo.domain.Task;
import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.SpringDataJpaUserDetailsService;

import org.hibernate.annotations.SourceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

// tag::code[]
@Controller // <1>
public class HomeController {

	@Autowired
	UserRepository UserRepository;
	@Autowired
	SpringDataJpaUserDetailsService userDetailsService;

	@PreAuthorize("authentication.name == #name")
	@RequestMapping(value = "/getUser/{name}", method = RequestMethod.GET) // <2>
	@ResponseBody
	public ResponseEntity<User> getUser(@PathVariable String name) {
		return new ResponseEntity<>(UserRepository.findByName(name), HttpStatus.OK); // <3>
	}

	@PreAuthorize("authentication.name == #name")
	@RequestMapping(value = "/uploadTask/{name}", method = RequestMethod.POST) // <2>
	@ResponseBody
	public ResponseEntity<User> updateTask(@PathVariable String name, @RequestBody Task[] tasks) {

		User user = UserRepository.findByName(name);

		user.setTasks(tasks);
		user.setLastModifiedDate(new Date().getTime());
		
		UserRepository.save(user);

		return new ResponseEntity<>(UserRepository.findByName(name), HttpStatus.OK); // <3>
	}

	@RequestMapping(value = "/") // <2>
	public String index() {
		return "index"; // <3>
	}

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestParam("username") String username,
			@RequestParam("password") String password, @RequestParam("email") String email,
			RedirectAttributes redirectAttributes) {

		if (UserRepository.findByEmail(email) == null) {
			UserRepository.save(new User(username, password, email));
			return ResponseEntity.status(201).body("You unsuccessfully sign-up !");
		} else {
			return ResponseEntity.status(202).body("Email already exist!");
		}
	}

}
// end::code[]
