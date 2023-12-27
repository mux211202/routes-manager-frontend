package com.melihovs.routemanagerbackend.entity.routes;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.melihovs.routemanagerbackend.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "routeTypes")
public class RouteType {

    @Id
    @GeneratedValue(generator = "uuid2", strategy = GenerationType.UUID)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    @ManyToMany(mappedBy = "savedRouteTypes")
    private Set<User> usersSaved;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "to_value_id")
    private PlaceSearchResult toValue;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "from_value_id")
    private PlaceSearchResult fromValue;

    public RouteType(PlaceSearchResult toValue, PlaceSearchResult fromValue) {
        this.toValue = toValue;
        this.fromValue = fromValue;
    }
}
