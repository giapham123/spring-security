package com.example.demoSecurity.apiTest.mappers;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.model.ShopModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ShowAllProductMapper {

    List<ProductModel> getAllProductViaCategory(@Param("cateCd") String cateCd, @Param("page") Integer page, @Param("edit") Integer edit);

    List<ProductModel> getAllProductViaUser(@Param("userId") Integer userId, @Param("page") Integer page, @Param("edit") Integer edit);

    ShopModel getDetailUser(@Param("userId") Integer userId);

    int countTotalProductCate(@Param("cateCd") String cateCd,@Param("userId") Integer userId,@Param("edit") Integer edit);

    int countTotalProductUser(@Param("cateCd") String cateCd,@Param("userId") Integer userId,@Param("edit") Integer edit);

}
