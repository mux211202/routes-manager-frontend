package com.melihovs.routemanagerbackend.entity.routes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.melihovs.routemanagerbackend.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "routeTypes")
public class RouteType {

    @Id
//    @GeneratedValue(generator = "uuid2", strategy = GenerationType.UUID)
//    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    @ManyToMany(mappedBy = "savedRouteTypes")
    @ToString.Exclude
    @JsonIgnore
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

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        RouteType routeType = (RouteType) o;
        return getId() != null && Objects.equals(getId(), routeType.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }

    @Override
    public String toString() {
        return "RouteType{}";
    }
}
