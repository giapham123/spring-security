package com.example.demoSecurity.apiTest.mappers;
import com.example.demoSecurity.apiTest.model.TestApiModel;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestApiMapper {
    TestApiModel getData();
}
