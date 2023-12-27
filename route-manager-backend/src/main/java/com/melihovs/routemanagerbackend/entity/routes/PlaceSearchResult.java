package com.melihovs.routemanagerbackend.entity.routes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "placeSearchResults")
public class PlaceSearchResult {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String address;
    private String name;
    private String imageUrl;
    private String iconUrl;

    @OneToOne(mappedBy = "toValue")
    private RouteType toValueRouteType;

    @OneToOne(mappedBy = "fromValue")
    private RouteType fromValueRouteType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "coordinates_id", referencedColumnName = "id")
    private Coordinates coordinates;
}
