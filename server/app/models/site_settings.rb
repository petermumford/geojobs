class SiteSettings

  def job_types
    @job_types ||= begin
      JobType.order(:position).to_a
    end
  end


end