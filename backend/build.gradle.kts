plugins {
    java
    id("org.springframework.boot") version "4.0.6"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "dev.nz3x"
version = "0.0.1-SNAPSHOT"
description = "backend"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Web
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-websocket")

    // Persistence
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("com.microsoft.sqlserver:mssql-jdbc")
    implementation("org.flywaydb:flyway-core")

    // Security
    implementation("org.springframework.boot:spring-boot-starter-security")

    // Cache / Messaging
    implementation("org.springframework.boot:spring-boot-starter-data-redis")

    // Observability
    implementation("org.springframework.boot:spring-boot-starter-actuator")

    // Utilities
    implementation("org.mapstruct:mapstruct:1.6.3")
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")

    // Test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
