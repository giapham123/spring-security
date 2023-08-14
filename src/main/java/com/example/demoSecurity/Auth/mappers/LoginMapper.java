package com.example.demoSecurity.Auth.mappers;

import com.example.demoSecurity.Auth.loginModel;
import com.example.demoSecurity.apiTest.model.ShopModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginMapper {

    loginModel getUserLogin(@Param("email") String email);

    int insertUserShop(ShopModel shopModel);

    int activeUser(@Param("uuid") String uuid);
}
