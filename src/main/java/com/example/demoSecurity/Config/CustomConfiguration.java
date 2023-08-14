package com.example.demoSecurity.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class CustomConfiguration implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        String viewname = "forward:/";

        registry.addViewController("/post-page")
                .setViewName(viewname);
        registry.addViewController("/details/{id}")
                .setViewName(viewname);
        registry.addViewController("/personal-page/{id}")
                .setViewName(viewname);
        registry.addViewController("/personal/{id}")
                .setViewName(viewname);
        registry.addViewController("/all-product/{id}")
                .setViewName(viewname);
//        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
//                .setViewName(viewname);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/**")
//                .addResourceLocations("classpath:/public/")
//                .resourceChain(false);
//                .addResolver(new PushStateResourceResolver());
        exposeDirectory("product-photos", registry);
        registry.addResourceHandler("/**").addResourceLocations("classpath:/public/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH")
                .allowedHeaders("X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization")
                .allowCredentials(false)
                .maxAge(3600)
        ;
    }

    private void exposeDirectory(String dirName, ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get(dirName);
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        if (dirName.startsWith("../")) dirName = dirName.replace("../", "");

        registry.addResourceHandler("/" + dirName + "/**").addResourceLocations("file:/"+ uploadPath + "/");
    }

}