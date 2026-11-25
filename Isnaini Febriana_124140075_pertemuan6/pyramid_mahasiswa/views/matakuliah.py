from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPConflict,
    HTTPCreated,
    HTTPOk,
    HTTPNoContent,
)
from sqlalchemy.exc import IntegrityError
from pyramid_sqlalchemy import Session
from ..models import Matakuliah


def _json_body(request):
    try:
        data = request.json_body
    except (ValueError, AttributeError):
        raise HTTPBadRequest(json_body={"error": "Body harus berupa JSON yang valid."})
    if not isinstance(data, dict):
        raise HTTPBadRequest(json_body={"error": "Body JSON harus berupa object."})
    return data


def _validate(data):
    required = ("kode_mk", "nama_mk", "sks", "semester")
    missing = [field for field in required if field not in data or data[field] is None or data[field] == ""]
    if missing:
        raise HTTPBadRequest(json_body={
            "error": "Field wajib belum lengkap.",
            "missing_fields": missing,
        })

    for field in ("kode_mk", "nama_mk"):
        if not isinstance(data[field], str) or not data[field].strip():
            raise HTTPBadRequest(json_body={"error": f"{field} harus berupa teks dan tidak boleh kosong."})

    for field in ("sks", "semester"):
        value = data[field]
        if isinstance(value, bool) or not isinstance(value, int) or value <= 0:
            raise HTTPBadRequest(json_body={"error": f"{field} harus berupa bilangan bulat positif."})

    return {
        "kode_mk": data["kode_mk"].strip(),
        "nama_mk": data["nama_mk"].strip(),
        "sks": data["sks"],
        "semester": data["semester"],
    }


@view_config(route_name="matakuliah_list", renderer="json")
def list_matakuliah(request):
    rows = Session.query(Matakuliah).order_by(Matakuliah.id).all()
    return {"data": [row.to_dict() for row in rows]}


@view_config(route_name="matakuliah_detail", renderer="json")
def detail_matakuliah(request):
    row = Session.query(Matakuliah).filter_by(id=int(request.matchdict["id"])).first()
    if row is None:
        raise HTTPNotFound(json_body={"error": "Matakuliah tidak ditemukan."})
    return {"data": row.to_dict()}


@view_config(route_name="matakuliah_create", renderer="json")
def create_matakuliah(request):
    values = _validate(_json_body(request))
    row = Matakuliah(**values)
    Session.add(row)
    try:
        Session.flush()
    except IntegrityError:
        Session.rollback()
        raise HTTPConflict(json_body={"error": "kode_mk sudah digunakan."})
    request.response.status = 201
    return {"message": "Matakuliah berhasil ditambahkan.", "data": row.to_dict()}


@view_config(route_name="matakuliah_update", renderer="json")
def update_matakuliah(request):
    row = Session.query(Matakuliah).filter_by(id=int(request.matchdict["id"])).first()
    if row is None:
        raise HTTPNotFound(json_body={"error": "Matakuliah tidak ditemukan."})
    values = _validate(_json_body(request))
    for key, value in values.items():
        setattr(row, key, value)
    try:
        Session.flush()
    except IntegrityError:
        Session.rollback()
        raise HTTPConflict(json_body={"error": "kode_mk sudah digunakan."})
    return {"message": "Matakuliah berhasil diperbarui.", "data": row.to_dict()}


@view_config(route_name="matakuliah_delete", renderer="json")
def delete_matakuliah(request):
    row = Session.query(Matakuliah).filter_by(id=int(request.matchdict["id"])).first()
    if row is None:
        raise HTTPNotFound(json_body={"error": "Matakuliah tidak ditemukan."})
    Session.delete(row)
    return {"message": "Matakuliah berhasil dihapus."}
