package com.example.demoSecurity.apiTest.services;

import com.example.demoSecurity.apiTest.mappers.TestApiMapper;
import com.example.demoSecurity.apiTest.model.TestApiModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestApiService implements ITestApiService{

    @Autowired
    TestApiMapper testApiMapper;
    @Override
    public TestApiModel getdata() {
        return testApiMapper.getData();
    }
}
