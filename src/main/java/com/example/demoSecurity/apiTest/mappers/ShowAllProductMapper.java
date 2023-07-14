package com.example.demoSecurity.apiTest.mappers;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.model.ShopModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ShowAllProductMapper {

    List<ProductModel> getAllProductViaCategory(@Param("cateCd") String cateCd, @Param("page") Integer page);

    List<ProductModel> getAllProductViaUser(@Param("userId") Integer userId, @Param("page") Integer page);

    ShopModel getDetailUser(@Param("userId") Integer userId);
}
