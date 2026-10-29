{{- printf "# %s\n\n%s\n\n" .Site.Title .Site.Params.description -}}
{{- range .Site.RegularPages -}}
{{- printf "## [%s](%s)\n\n%s\n\n" .Title .Permalink (.Plain | default .Summary) -}}
{{- end -}}