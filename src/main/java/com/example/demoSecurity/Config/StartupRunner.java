package com.example.demoSecurity.Config;

import com.mysql.jdbc.log.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class StartupRunner  implements CommandLineRunner {

    @Autowired
    private DataSource ds;
    @Override
    public void run(String... args) throws Exception {
       System.out.println("Connection DB: "+ds.getConnection().toString());
    }
}
