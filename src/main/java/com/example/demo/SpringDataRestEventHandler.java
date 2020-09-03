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

import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.stereotype.Component;


// tag::code[]
@Component
public class SpringDataRestEventHandler {

	@Autowired
	UserRepository UserRepository;


	@HandleBeforeCreate
	@HandleBeforeSave
	public void applyUserInformationUsingSecurityContext() {

		// String name = SecurityContextHolder.getContext().getAuthentication().getName();
		// Manager manager = this.managerRepository.findByName(name);
		// if (manager == null) {
		// 	Manager newManager = new Manager();
		// 	newManager.setName(name);
		// 	newManager.setRoles(new String[]{"Admin"});
		// 	manager = this.managerRepository.save(newManager);
		// }
		// product.setManager(manager);
	}
}
// end::code[]
