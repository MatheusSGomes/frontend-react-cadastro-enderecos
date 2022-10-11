function UFsEdit() {
  return (
    <>
      <h2 class="mt-4">Editar UF</h2>
      <hr />

      <form action="" method="POST">      
          <div class="row g-3">
            <div class="col-8">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="nome" name="nome" value="" />
            </div>
      
            <div class="col-4">
              <label for="sigla" class="form-label">Sigla</label>
              <input type="text" class="form-control" id="sigla" name="sigla" value="" />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
          </div>
      </form>
    </>
  );
}

export default UFsEdit;