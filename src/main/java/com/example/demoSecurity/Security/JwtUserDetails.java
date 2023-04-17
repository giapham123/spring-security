package com.example.demoSecurity.Security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class JwtUserDetails  extends User {

    public final int id;

    public final String department;

    public JwtUserDetails(final int id,final String department , final String username, final String hash,
                          final Collection<? extends GrantedAuthority> authorities) {
        super(username, hash, authorities);
        this.id = id;
        this.department = department;
    }

}
