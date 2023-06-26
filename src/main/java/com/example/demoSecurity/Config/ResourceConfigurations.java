package com.example.demoSecurity.Config;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
@PropertySource("classpath:application.properties")
public class ResourceConfigurations {
    @Value("${storage.images}")
    private String reportStorage;

    public Path getReportStorage(HttpServletRequest request) {
        return getPath(this.reportStorage, request);
    }

    private static Path getPath(String folderName, HttpServletRequest request) {
        try {
            String contextPath = request.getSession().getServletContext().getRealPath("/");
            Path path = Paths.get(contextPath, folderName);
            if (!Files.exists(path)) {
                FileUtils.forceMkdir(path.toFile());
            }

            return path;
        } catch (Exception e) {
//            LOGGER.error("Can not prepare storage folder of " + folderName, e);
        }

        return null;
    }
}
