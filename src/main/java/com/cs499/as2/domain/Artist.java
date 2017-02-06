package com.cs499.as2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Artist.
 */
@Entity
@Table(name = "artist")
public class Artist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "atname")
    private String atname;

    @Column(name = "bday")
    private LocalDate bday;

    @OneToMany(mappedBy = "artist")
    @JsonIgnore
    private Set<Book> books = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAtname() {
        return atname;
    }

    public Artist atname(String atname) {
        this.atname = atname;
        return this;
    }

    public void setAtname(String atname) {
        this.atname = atname;
    }

    public LocalDate getBday() {
        return bday;
    }

    public Artist bday(LocalDate bday) {
        this.bday = bday;
        return this;
    }

    public void setBday(LocalDate bday) {
        this.bday = bday;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public Artist books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public Artist addBook(Book book) {
        books.add(book);
        book.setArtist(this);
        return this;
    }

    public Artist removeBook(Book book) {
        books.remove(book);
        book.setArtist(null);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Artist artist = (Artist) o;
        if (artist.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, artist.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Artist{" +
            "id=" + id +
            ", atname='" + atname + "'" +
            ", bday='" + bday + "'" +
            '}';
    }
}
