from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPConflict,
)
from sqlalchemy.exc import IntegrityError
from pyramid_sqlalchemy import Session
from ..models import Mahasiswa


@view_config(route_name="mahasiswa_list", renderer="json")
def list_mahasiswa(request):
    rows = Session.query(Mahasiswa).order_by(Mahasiswa.id).all()
    return {"data": [row.to_dict() for row in rows]}


@view_config(route_name="mahasiswa_create", renderer="json")
def create_mahasiswa(request):
    try:
        data = request.json_body
    except (ValueError, AttributeError):
        raise HTTPBadRequest(json_body={"error": "Body harus berupa JSON yang valid."})

    if not isinstance(data, dict):
        raise HTTPBadRequest(json_body={"error": "Body JSON harus berupa object."})

    nama = data.get("nama")
    nim = data.get("nim")

    if not isinstance(nama, str) or not nama.strip():
        raise HTTPBadRequest(json_body={"error": "Nama wajib diisi."})

    if not isinstance(nim, str) or not nim.strip():
        raise HTTPBadRequest(json_body={"error": "NIM wajib diisi."})

    mahasiswa = Mahasiswa(nama=nama.strip(), nim=nim.strip())
    Session.add(mahasiswa)

    try:
        Session.flush()
    except IntegrityError:
        Session.rollback()
        raise HTTPConflict(json_body={"error": "NIM sudah digunakan."})

    request.response.status = 201
    return {
        "message": "Mahasiswa berhasil ditambahkan.",
        "data": mahasiswa.to_dict()
    }


@view_config(route_name="mahasiswa_detail", renderer="json")
def detail_mahasiswa(request):
    row = Session.query(Mahasiswa).filter_by(
        id=int(request.matchdict["id"])
    ).first()

    if row is None:
        raise HTTPNotFound(json_body={"error": "Mahasiswa tidak ditemukan."})

    return {"data": row.to_dict()}


@view_config(route_name="mahasiswa_update", renderer="json")
def update_mahasiswa(request):
    row = Session.query(Mahasiswa).filter_by(
        id=int(request.matchdict["id"])
    ).first()

    if row is None:
        raise HTTPNotFound(json_body={"error": "Mahasiswa tidak ditemukan."})

    try:
        data = request.json_body
    except (ValueError, AttributeError):
        raise HTTPBadRequest(json_body={"error": "Body harus berupa JSON yang valid."})

    if not isinstance(data, dict):
        raise HTTPBadRequest(json_body={"error": "Body JSON harus berupa object."})

    nama = data.get("nama")
    nim = data.get("nim")

    if not isinstance(nama, str) or not nama.strip():
        raise HTTPBadRequest(json_body={"error": "Nama wajib diisi."})

    if not isinstance(nim, str) or not nim.strip():
        raise HTTPBadRequest(json_body={"error": "NIM wajib diisi."})

    row.nama = nama.strip()
    row.nim = nim.strip()

    try:
        Session.flush()
    except IntegrityError:
        Session.rollback()
        raise HTTPConflict(json_body={"error": "NIM sudah digunakan."})

    return {
        "message": "Mahasiswa berhasil diperbarui.",
        "data": row.to_dict()
    }


@view_config(route_name="mahasiswa_delete", renderer="json")
def delete_mahasiswa(request):
    row = Session.query(Mahasiswa).filter_by(
        id=int(request.matchdict["id"])
    ).first()

    if row is None:
        raise HTTPNotFound(json_body={"error": "Mahasiswa tidak ditemukan."})

    Session.delete(row)
    return {"message": "Mahasiswa berhasil dihapus."}