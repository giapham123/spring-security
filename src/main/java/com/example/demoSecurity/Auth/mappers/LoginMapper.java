package com.example.demoSecurity.Auth.mappers;

import com.example.demoSecurity.Auth.loginModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginMapper {

    loginModel getUserLogin(@Param("email") String email);

}
